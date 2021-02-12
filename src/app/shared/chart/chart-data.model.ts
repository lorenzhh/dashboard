export interface Chart {
    data: number[];
    label?: string;
    legend?: boolean;
}

export type ChartData = [Chart];
