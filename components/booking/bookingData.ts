export interface BookingFormData {
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  website: string;
  purpose: string;
  message: string;
}

export const EMPTY_BOOKING_FORM: BookingFormData = {
  fullName: "",
  businessName: "",
  email: "",
  phone: "",
  website: "",
  purpose: "",
  message: "",
};

/** Mock availability — every day shows the same slots until real calendar availability is wired up in the next phase. */
export const AVAILABLE_TIME_SLOTS: string[] = [
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
];

export const PURPOSE_OPTIONS: string[] = [
  "Brand Strategy",
  "Website Development",
  "Social Media Management",
  "Content Production",
  "Performance Marketing",
  "Complete Brand Growth",
  "Other",
];

export const TIMEZONE_LABEL = "Asia/Kolkata (GMT+5:30)";

export const TRUST_BADGES: [string, string][] = [
  ["Free Strategy", "Session"],
  ["No Sales", "Pressure"],
  ["Response Within", "24 Hours"],
  ["Google Meet", "Invitation Included"],
];
