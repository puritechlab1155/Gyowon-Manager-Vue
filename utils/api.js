export const fetchData = async (endpoint, options = {}) => {
  const { public: { backendUrl } } = useRuntimeConfig();
  const headers = useRequestHeaders(['cookie']); // 쿠키 전달 (SSR 대응)

  try {
    return await $fetch(endpoint, {
      baseURL: backendUrl,
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    });
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};