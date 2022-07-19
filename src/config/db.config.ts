import mongoose from 'mongoose';
import { logger } from 'src/utils';

export function connect() {
  mongoose.connect('mongodb://localhost/myblog', {});
  const db = mongoose.connection;
  db.once('open', () => {
    logger.log('mongodb connect success', logger.getBaseName(__filename));
  });
}
