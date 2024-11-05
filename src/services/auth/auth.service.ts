import { ILocalSession } from '@/types/auth/local-session.types';
import { NavigateFunction } from 'react-router-dom';

// Session helper functions
const setSession = (user: ILocalSession): void => {
  localStorage.setItem('session', JSON.stringify(user));
};

const getSession = (): ILocalSession | null => {
  const session = localStorage.getItem('session');
  return session ? JSON.parse(session) : null;
};

const hasSession = (): boolean => {
  return !!localStorage.getItem('session');
};

const deleteSession = (): void => {
  localStorage.removeItem('session');
};

class AuthService {
  private readonly navigate: NavigateFunction;

  constructor(navigate: NavigateFunction) {
    this.navigate = navigate;
  }

  // Computed property for user role
  get role(): string {
    const user = this.getCurrentSession();
    if (!user) return 'Unknown';
    if (user.owner) return 'Owner';
    if (user.is_admin) return 'Admin';
    return 'Member';
  }

  // Session management methods
  public isAuthenticated(): boolean {
    return !!this.getCurrentSession();
  }

  public setCurrentSession(user: ILocalSession): void {
    setSession(user);
  }

  public getCurrentSession(): ILocalSession | null {
    return getSession();
  }

  public isOwnerOrAdmin(): boolean {
    return !!(this.getCurrentSession()?.owner || this.getCurrentSession()?.is_admin);
  }

  // Sign out methods
  public async signOut(): Promise<void> {
    try {
      if (hasSession()) {
        deleteSession();
      }
    } catch (e) {
      // ignored
    }
  }

  private onSignOutConfirm(): void {
    void this.signOut();
    window.location.href = '/secure/logout';
  }
}

// Hook for using AuthService in components
export const createAuthService = (navigate: NavigateFunction): AuthService => {
  return new AuthService(navigate);
};
