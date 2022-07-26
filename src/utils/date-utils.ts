import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';

export const dateUtils = (date: string) => {
  dayjs.extend(relativeTime);
  dayjs.locale('ru');
  return dayjs(date).from(dayjs());
};
