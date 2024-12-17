export type LogLevel = 'info' | 'success' | 'warning' | 'error' | 'debug';

interface LogStyles {
  title: string;
  text: string;
  background?: string;
}

interface LogOptions {
  showTimestamp?: boolean;
  collapsed?: boolean;
  level?: LogLevel;
}

class ConsoleLogger {
  private readonly styles: Record<LogLevel, LogStyles> = {
    info: {
      title: 'color: #1890ff; font-weight: bold; font-size: 12px;',
      text: 'color: #1890ff; font-size: 12px;',
      background: 'background: transparent; padding: 2px 5px; border-radius: 2px;'
    },
    success: {
      title: 'color: #52c41a; font-weight: bold; font-size: 12px;',
      text: 'color: #52c41a; font-size: 12px;',
      background: 'background: transparent; padding: 2px 5px; border-radius: 2px;'
    },
    warning: {
      title: 'color: #faad14; font-weight: bold; font-size: 12px;',
      text: 'color: #faad14; font-size: 12px;',
      background: 'background: transparent; padding: 2px 5px; border-radius: 2px;'
    },
    error: {
      title: 'color: #ff4d4f; font-weight: bold; font-size: 12px;',
      text: 'color: #ff4d4f; font-size: 12px;',
      background: 'background: transparent; padding: 2px 5px; border-radius: 2px;'
    },
    debug: {
      title: 'color: #722ed1; font-weight: bold; font-size: 12px;',
      text: 'color: #722ed1; font-size: 12px;',
      background: 'background: transparent; padding: 2px 5px; border-radius: 2px;'
    }
  };

  private isProduction = import.meta.env.PROD;

  private getTimestamp(): string {
    return new Date().toISOString();
  }

  private formatValue(value: unknown): unknown {
    if (value instanceof Error) {
      return {
        name: value.name,
        message: value.message,
        stack: value.stack
      };
    }
    return value;
  }

  private log(
    title: string,
    data: unknown,
    options: LogOptions = {}
  ): void {
    if (this.isProduction) return;

    const {
      showTimestamp = true,
      collapsed = false,
      level = 'info'
    } = options;

    const styles = this.styles[level];
    const logMethod = collapsed ? console.groupCollapsed : console.group;

    logMethod(
      `%c${showTimestamp ? `[${this.getTimestamp()}] ` : ''}${title}`,
      styles.background ?? styles.title
    );

    if (typeof data === 'object' && data !== null) {
      Object.entries(this.formatValue(data)).forEach(([key, value]) => {
        console.log(
          `%c${key}:`,
          styles.title,
          this.formatValue(value)
        );
      });
    } else {
      console.log(`%cValue:`, styles.title, this.formatValue(data));
    }

    console.groupEnd();
  }

  // Public logging methods
  public info(title: string, data: unknown | null = null, options?: Omit<LogOptions, 'level'>): void {
    this.log(title, data, { ...options, level: 'info' });
  }

  public success(title: string, data: unknown | null = null , options?: Omit<LogOptions, 'level'>): void {
    this.log(title, data, { ...options, level: 'success' });
  }

  public warning(title: string, data: unknown | null = null, options?: Omit<LogOptions, 'level'>): void {
    this.log(title, data, { ...options, level: 'warning' });
  }

  public error(title: string, data: unknown | null = null, options?: Omit<LogOptions, 'level'>): void {
    this.log(title, data, { ...options, level: 'error' });
  }

  public debug(title: string, data: unknown | null = null, options?: Omit<LogOptions, 'level'>): void {
    this.log(title, data, { ...options, level: 'debug' });
  }

  // Table logging
  public table(title: string, data: unknown[] | null = null): void {
    if (this.isProduction) return;
    
    console.group(`%c${title}`, this.styles.info.title);
    console.table(data);
    console.groupEnd();
  }

  // Performance logging
  public time(label: string): void {
    if (this.isProduction) return;
    console.time(label);
  }

  public timeEnd(label: string): void {
    if (this.isProduction) return;
    console.timeEnd(label);
  }

  // Group logging
  public group(title: string, collapsed: boolean = false): void {
    if (this.isProduction) return;
    
    const method = collapsed ? console.groupCollapsed : console.group;
    method(`%c${title}`, this.styles.info.title);
  }

  public groupEnd(): void {
    if (this.isProduction) return;
    console.groupEnd();
  }
}

// Create default instance
const logger = new ConsoleLogger();
export default logger;