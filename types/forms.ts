export type TokenFormData = {
    template: string;
    token: string;
    user_id: string;
};

export type BrandFormData = {
    name: string;
    description?: string;
    slug: string;
    image: string;
    user_id: string;
};