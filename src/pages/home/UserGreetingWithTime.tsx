import { Flex, Typography } from 'antd'
import React from 'react'
import { colors } from '../../styles/colors'
import { greetingString } from '../../utils/greetingString'
import dayjs from 'dayjs'

const UserGreetingWithTime = () => {
    const date = dayjs()
    // get a greeting message based on the time
    const greet: string = greetingString('Sachintha')

    return (
        <Flex vertical gap={8} align="center">
            <Typography.Title
                level={3}
                style={{ fontWeight: 500, marginBlock: 0 }}
            >
                {greet}
            </Typography.Title>
            <Typography.Title
                level={4}
                style={{
                    fontSize: 16,
                    fontWeight: 400,
                    marginBlock: 0,
                    color: colors.skyBlue,
                }}
            >
                Today is {date.format('dddd, MMMM DD, YYYY')}
            </Typography.Title>
        </Flex>
    )
}

export default UserGreetingWithTime
