import { DatePicker } from "antd";
import dayjs from "dayjs";

const {RangePicker} = DatePicker

export const CustomRangePicker = ({props}) => {
    return <RangePicker {...props} className='!w-full' />
}