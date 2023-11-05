import * as dayjs from 'dayjs'

import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)

export function utcFormatUtil(utcString: string) {
  return dayjs.utc(utcString).utcOffset(8).format('YYYY-MM-DD HH:mm:ss')
}
