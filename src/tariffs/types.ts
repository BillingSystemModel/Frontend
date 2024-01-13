export interface Tariffs {
    tariffs: Tariff[];
}

export interface Tariff {
    title: string;
    description: string;
    telephonyPackage: TelephonyPackage;
    internetPackage: InternetPackage;
}

export interface TelephonyPackage {
    incomingCall: boolean;
    packOfMinutes: number;
    packCost: number;
    packCostPerMinute: boolean;
    extraPackCost: number;
    extraPackCostPerMinute: boolean;
}

export interface InternetPackage {
    packOfMB: number;
    packCost: number;
    packCostPerMB: boolean;
    extraPackCost: number;
    extraPackCostPerMB: boolean;
}
