import { LoggerService } from '@nestjs/common';
import { basename } from 'path';
import * as fs from 'fs';
import { resolve } from 'path';
import { promisify } from 'util';
import { gray, cyan, yellowBright, red, yellow } from 'colorette';

const stat = promisify(fs.stat);
function addLogFile(message: string) {
  if (!message) return;
  const date = new Date();
  const filePath = resolve(
    __dirname,
    './../../logs/',
    `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}.txt`,
  );

  stat(filePath).then(
    () => {
      fs.writeFile(
        filePath,
        message,
        {
          flag: 'a+',
        },
        (err) => {
          if (err) console.error(err);
        },
      );
    },
    () => {
      // 当天日志不存在则创建
      fs.writeFile(
        filePath,
        '',
        {
          flag: 'w+',
        },
        (err) => {
          console.error(err);
        },
      );
    },
  );
}

export class Logger implements LoggerService {
  /**
   * Write a 'log' level log.
   */
  log(message: any, ...optionalParams: any[]) {
    console.log(
      `${gray('[Log]')} ${cyan(new Date().toLocaleString())} ${yellowBright(
        JSON.stringify(optionalParams),
      )} ${message}`,
    );
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {
    const rowMsg = `"[Error] ${new Date().toLocaleString()} [${optionalParams}] ${message}"\n`;
    const printMsg = `${red('[Error]')} ${cyan(
      new Date().toLocaleString(),
    )} ${yellowBright(JSON.stringify(optionalParams))} ${message}`;

    console.error(printMsg);
    addLogFile(rowMsg);
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {
    const rowMsg = `"[Warn] ${new Date().toLocaleString()} [${optionalParams}] ${message}"\n`;
    const printMsg = `${yellow('[Warn]')} ${cyan(
      new Date().toLocaleString(),
    )} ${yellowBright(JSON.stringify(optionalParams))} ${message}`;

    console.error(printMsg);
    addLogFile(rowMsg);
  }

  // /**
  //  * Write a 'debug' level log.
  //  */
  // debug?(message: any, ...optionalParams: any[]) {
  //   console.debug(message);
  // }

  // /**
  //  * Write a 'verbose' level log.
  //  */
  // verbose?(message: any, ...optionalParams: any[]) {
  //   console.dir(message);
  // }

  /**
   * get file basename
   */
  getBaseName?(filepath) {
    return basename(filepath);
  }
}

export const logger = new Logger();
