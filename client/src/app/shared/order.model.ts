export class Order {
    // ['order_id', 'orderPoster', 'planType', 'cpeType', 'useType', 'orderChannel',
    // 'how_u_know', 'remark', 'toInstall'];

    order_id: number;   //number
    orderPoster: string;
    planType: string;
    cpeType: string;
    useType: string;
    orderChannel: string;
    how_u_know: string;
    remark:string;
    status: string;
    toInstall:boolean;
}
