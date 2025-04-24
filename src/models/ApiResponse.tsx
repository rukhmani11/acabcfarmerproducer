export interface ApiResponse {
    isSuccess: boolean;
    data: any;
    list: any[];
}

export interface SelectListModel {
    value: string;
    label: string;
}

export interface MultiSelectListModel {
    value: string;
    label: string;
}

export interface TabModel {
    Text: string;
    Content: any;
}