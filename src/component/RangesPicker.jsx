import { DatePicker } from "antd";

const {RangePicker} = DatePicker

export const CustomRangePicker = ({props}) => {
    return <RangePicker {...props} className='!w-full'/>
}