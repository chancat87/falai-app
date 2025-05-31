import { fal } from "@fal-ai/client";
import { toast } from "vue-sonner";

// 常量
const API_KEYS_STORAGE_KEY = 'fal-ai-api-keys';
const ACTIVE_KEY_INDEX_STORAGE_KEY = 'fal-ai-active-key-index';
const ACTIVE_KEY_STORAGE_KEY = 'fal-ai-active-key';
const API_KEYS_URL = import.meta.env.VITE_FAL_API_KEYS_URL || '';

// 类型
interface ApiKeyInfo {
  key: string;
  name: string;
  isSystem?: boolean;
  balance?: number;
  lastChecked?: number;
  group?: string;
  isValid?: boolean;
  invalidReason?: string;
  isLoading?: boolean;
}

/**
 * 获取所有API密钥
 */
export function getAllApiKeys(): ApiKeyInfo[] {
  try {
    const storedKeys = localStorage.getItem(API_KEYS_STORAGE_KEY);
    if (storedKeys) {
      return JSON.parse(storedKeys);
    }
  } catch (error) {
    console.error('解析API密钥失败:', error);
  }
  return [];
}

/**
 * 获取当前活动的API密钥索引
 */
export function getActiveKeyIndex(): number {
  try {
    const storedIndex = localStorage.getItem(ACTIVE_KEY_INDEX_STORAGE_KEY);
    if (storedIndex && !isNaN(Number(storedIndex))) {
      return Number(storedIndex);
    }
  } catch (error) {
    console.error('解析活动密钥索引失败:', error);
  }
  return -1;
}

/**
 * 设置活动API密钥
 */
export function setActiveKey(index: number): boolean {
  const keys = getAllApiKeys();

  if (index >= 0 && index < keys.length) {
    // 检查密钥是否失效
    if (keys[index].isValid === false) {
      console.warn(`无法激活失效的API密钥: ${keys[index].name}`);
      return false;
    }

    // 设置活动密钥
    const key = keys[index].key;
    configureFalClient(key);
    localStorage.setItem(ACTIVE_KEY_INDEX_STORAGE_KEY, index.toString());
    localStorage.setItem(ACTIVE_KEY_STORAGE_KEY, key);

    return true;
  }

  return false;
}

/**
 * 从URL拉取API密钥文件
 */
export async function fetchApiKeysFromUrl(): Promise<string[]> {
  if (!API_KEYS_URL) {
    return [];
  }

  try {
    console.log('正在从URL拉取API密钥:', API_KEYS_URL);
    const response = await fetch(API_KEYS_URL);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const content = await response.text();

    // 按行分割，过滤空行和注释行
    const keys = content
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('#') && !line.startsWith('//'));

    console.log(`成功从URL加载了 ${keys.length} 个API密钥`);
    return keys;
  } catch (error) {
    console.error('从URL拉取API密钥失败:', error);
    toast.error(`从URL拉取API密钥失败: ${error instanceof Error ? error.message : '未知错误'}`);
    return [];
  }
}

/**
 * 配置FAL客户端
 */
export function configureFalClient(apiKey: string) {
  fal.config({
    credentials: apiKey,
  });
}

/**
 * 标记密钥为无效
 */
export function markKeyAsInvalid(index: number, reason: string = 'unknown'): void {
  const keys = getAllApiKeys();

  if (index >= 0 && index < keys.length) {
    keys[index].isValid = false;
    keys[index].invalidReason = reason;

    // 保存更新后的密钥列表
    localStorage.setItem(API_KEYS_STORAGE_KEY, JSON.stringify(keys));
  }
}

/**
 * 切换到下一个有效的API密钥
 * 如果当前是最后一个密钥，则切换到第一个密钥
 * 返回是否成功切换
 */
export function switchToNextValidKey(): boolean {
  const keys = getAllApiKeys();
  if (keys.length === 0) return false;

  const currentIndex = getActiveKeyIndex();
  if (currentIndex === -1) return false;

  // 标记当前密钥为无效（余额不足）
  markKeyAsInvalid(currentIndex, 'balance_exhausted');

  // 从下一个索引开始查找有效的密钥
  let nextIndex = (currentIndex + 1) % keys.length;
  const startIndex = nextIndex; // 记录起始索引，防止无限循环

  do {
    // 如果找到有效的密钥，则激活它
    if (keys[nextIndex].isValid !== false) {
      const success = setActiveKey(nextIndex);
      if (success) {
        toast.success(`已自动切换到下一个API密钥: ${keys[nextIndex].name}`);
        return true;
      }
    }

    // 移动到下一个索引
    nextIndex = (nextIndex + 1) % keys.length;
  } while (nextIndex !== startIndex); // 如果已经遍历了所有密钥，则退出循环

  // 如果没有找到有效的密钥，则提示用户
  toast.error('所有API密钥都已失效，请添加新的API密钥');
  return false;
}

/**
 * 处理余额不足错误
 * 自动切换到下一个有效的API密钥
 * 返回是否成功处理
 */
export function handleBalanceExhaustedError(): boolean {
  return switchToNextValidKey();
}
