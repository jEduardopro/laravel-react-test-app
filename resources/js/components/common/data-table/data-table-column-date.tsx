import { dateFormat } from '@/core/helpers/formatter.helper';

type Props = {
	date: string;
}
const DataTableColumnDate = ({date}: Props) => {
	return (
		<div className='lowercase'>{dateFormat(date)}</div>
	)
}

export default DataTableColumnDate
