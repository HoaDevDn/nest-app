import dayjs from 'dayjs';
// import { USER_DISPLAY_ID_LENGTH } from '~user/constants/user.constant';
const USER_DISPLAY_ID_LENGTH = 3;

export class UserProfileHelper {
  static generateDisplayId(
    countNewUsersInMonth: number,
    userLength: number = USER_DISPLAY_ID_LENGTH,
  ): string {
    const userNoInMonth = (countNewUsersInMonth + 1)
      .toString()
      .padStart(userLength, '0');
    const yearMonth = dayjs().format('YYMM');
    return `U${yearMonth}${userNoInMonth}`;
  }
}
