import { AtCard } from "taro-ui";

import './index.less';
import { ReactNode } from "react";

interface Props {
    info: Info;
    children: ReactNode;
}

interface Info {
    title: string;
    extra?: string;
    id: number|string;
    [key: string]: any;
}

export default function CardComponent (props: Props) {
    const { info } = props;
    return (
        <AtCard
            note=''
            extra={info.extra}
            title={info.title}
            >
            {props.children}
        </AtCard>
    )
}