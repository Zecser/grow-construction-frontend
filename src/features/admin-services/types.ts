export interface Offer {
  heading: string;
  description: string;
}

export interface WhyUsItem {
  heading: string;
  description: string;
}

export type Status = "Active" | "Inactive";

export interface Service {
  id: number;
  service_name: string;
  service_icon: string;
  service_banner: string;
  service_photo: string;
  service_sub_title: string;
  service_sub_decs: string;
  offers: Offer[]; 
  why_us_list: WhyUsItem[];
  status: Status;
  created_at: string;
  updated_at: string;
}
