import dayjs from 'dayjs';
import { ValueTransformer } from 'typeorm';

const DATE_FORMAT = 'DD/MM/YYYY';

const DB_BIRTH_DATE_FORMAT = 'YYYY-MM-DD';

export class DateTransformer implements ValueTransformer {
  to(value): string {
    if (!value) {
      return value;
    }
    return dayjs(value).format(DB_BIRTH_DATE_FORMAT);
  }

  from(value): string {
    if (!value) {
      return value;
    }
    return dayjs(value).format(DATE_FORMAT);
  }
}
