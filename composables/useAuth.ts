import { fetchData } from '@/utils/api';

export type User = {
  name: string;
  email?: string;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

// Value is initialized in: ~/plugins/auth.ts
export const useUser = () => {
  return useState<User | undefined | null>('user', () => undefined);
};

export const useAuth = async () => {
  const router = useRouter();
  const user = useUser();

  const isLoggedIn = computed(() => !!user.value);

  async function refresh() {
    try {
      user.value = await fetchCurrentUser();
    } catch {
      user.value = null;
      console.log('실패');
    }
  }

  async function login(credentials: LoginCredentials) {
    if (isLoggedIn.value) return;
    try {
      const result = await fetchData('api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const token = result.token;
      const cookie = useCookie('auth_token', {
        maxAge: 60 * 60 * 24 * 7,
        sameSite: true,
        secure: process.env.NODE_ENV === 'production', // 개발에서는 false : safari, firefox에서 쿠키가 생성안되는 현상 방지
      });
      cookie.value = token;
      refreshCookie('auth_token');
      await nextTick();
      if (cookie.value) {
        await refresh();
        await router.push('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  }

  async function logout() {
    const token = useCookie('auth_token');
    try {
      const result = await fetchData('api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${token.value}`,
        },
      });

      token.value = null;
      router.push('/login');
    } catch (error) {
      console.error('Login error:', error);
    }
  }

  return {
    user,
    isLoggedIn,
    login,
    logout,
    refresh,
  };
};

//User 불러오기
export const fetchCurrentUser = async () => {
  const token = useCookie('auth_token');
  try {
    const result = await fetchData('api/auth/me', {
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });
    return result;
  } catch (error: any) {
    console.error('Login error:', error);
  }
};
