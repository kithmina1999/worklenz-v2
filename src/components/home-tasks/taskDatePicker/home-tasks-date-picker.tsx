import { useSocket } from "@/socket/socketContext";
import { IProjectTask } from "@/types/project/projectTasksViewModel.types";
import { DatePicker } from "antd";
import dayjs from 'dayjs';
import { SocketEvents } from '@/shared/socket-events';
import type { Dayjs } from 'dayjs';
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useGetMyTasksQuery } from "@/api/home-page/home-page.api.service";

type HomeTasksDatePickerProps = {
    record: IProjectTask;
};

const HomeTasksDatePicker = ({ record }: HomeTasksDatePickerProps) => {
    const { socket, connected } = useSocket();
    const { t } = useTranslation('home');
    const { homeTasksConfig } = useAppSelector(state => state.homePageReducer);
    const { refetch } = useGetMyTasksQuery(homeTasksConfig);
    const [selectedDate, setSelectedDate] = useState<Dayjs | null>(record.end_date ? dayjs(record.end_date) : null);

    const handleChangeReceived = (value: any) => {
        refetch();
    };

    useEffect(() => {
        refetch();
    }, [homeTasksConfig]);

    useEffect(() => {
        socket?.on(SocketEvents.TASK_END_DATE_CHANGE.toString(), handleChangeReceived);
        socket?.on(SocketEvents.TASK_STATUS_CHANGE.toString(), handleChangeReceived);
        return () => {
            socket?.removeListener(SocketEvents.TASK_END_DATE_CHANGE.toString(), handleChangeReceived);
            socket?.removeListener(SocketEvents.TASK_STATUS_CHANGE.toString(), handleChangeReceived);
        };
    }, [connected]);

    const handleEndDateChanged = (value: Dayjs | null, taskId: string) => {
        setSelectedDate(value);
        if (!taskId) return;

        const body = {
            task_id: taskId,
            end_date: value?.format('YYYY-MM-DD'),
        };
        socket?.emit(SocketEvents.TASK_END_DATE_CHANGE.toString(), JSON.stringify(body));
    };

    const getDateText = () => {
        if (!selectedDate) return null;
        const today = dayjs();
        if (selectedDate.isSame(today, 'day')) {
            return <span style={{ color: 'green' }}>Today</span>;
        } else if (selectedDate.isSame(today.add(1, 'day'), 'day')) {
            return <span style={{ color: 'green' }}>Tomorrow</span>;
        } else if (selectedDate.isSame(today.subtract(1, 'day'), 'day')) {
            return <span style={{ color: 'red' }}>Yesterday</span>;
        }
        return null;
    };

    return (
        <DatePicker
            allowClear
            disabledDate={
                record.start_date ? current => current.isBefore(dayjs(record.start_date)) : undefined
            }
            placeholder={t('tasks.dueDatePlaceholder')}
            format={'MMM DD'}
            defaultValue={selectedDate}
            onChange={value => handleEndDateChanged(value || null, record.id || '')}
            suffixIcon={selectedDate ? getDateText() : null}
        />
    );
};

export default HomeTasksDatePicker;