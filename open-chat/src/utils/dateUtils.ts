import { format, getUnixTime } from 'date-fns';

export function getDateFromRawDateString(string: string): Date {
  const [ymd, hms, locale] = string.split(' ');
  const [year, month, day] = ymd.split('-').map((el) => Number(el));
  const [hour, minute, second] = hms.split(':').map((el) => Number(el));

  const timezoneOffsetHour = Math.floor(new Date().getTimezoneOffset() / 60);
  const localDate = new Date(year, month - 1, day, hour - timezoneOffsetHour, minute, second);

  return localDate;
}

type formatParameters = Parameters<typeof format>;

export const dateFormat = (
  date: formatParameters[0] | string | number,
  formatInString: formatParameters[1],
  options?: formatParameters[2]
) => {
  const dateData = typeof date === 'string' ? getDateFromRawDateString(date) : date;
  const dateInNumber = dateData instanceof Date ? Number(dateData.getTime()) : dateData;

  return format(dateInNumber, formatInString, options);
};

export const getNowUnixTime = () => getUnixTime(Date.now()) * 1000;
