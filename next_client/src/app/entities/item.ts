export interface Item {
    id: string;
    name: string;
    sellerId: string;
    sellerName: string;
    createdAt: string;
    updatedAt: string;
    createBy: string;
    updateBy: string;
    description: string;
    image: string;
    quantity: number;
    status: 'active' | 'inactive';
}
