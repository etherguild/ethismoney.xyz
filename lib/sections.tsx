type SectionDef = {
  label: string;
  description?: string;
  icon: string;
  sectionId: string;
  contentId: string;
  linkId: string;
  labelId: string;
  mobileNavId: string;
}

export const Sections: SectionDef[] = [
  {
    label: "ETH is Money in the Ethereum economy",
    description: "ETH is exported to L2s and sidechains and used as a high quality liquid asset (HQLA) for DeFi in the Ethereum economy.",
    icon: "gtp:eim-ethconomy",
    sectionId: "second-section",
    contentId: "second-content",
    linkId: "second-link",
    labelId: "second-label",
    mobileNavId: "second-mobile-nav",
  },
  {
    label: "ETH is held as a store of value",
    description: "ETH is a store of value that is immutable, scarce, censorship resistant and when staked it becomes a digital gold with yield.",
    icon: "gtp:eim-holdings",
    sectionId: "third-section",
    contentId: "third-content",
    linkId: "third-link",
    labelId: "third-label",
    mobileNavId: "third-mobile-nav",
  },
  {
    label: "ETH issuance is algorithmic",
    description: "Ethereum's proof-of-stake issuance with fee burn has the advantage of being more secure than bitcoin and more scarce than gold.",
    icon: "gtp:eim-issuance",
    sectionId: "fourth-section",
    contentId: "fourth-content",
    linkId: "fourth-link",
    labelId: "fourth-label",
    mobileNavId: "fourth-mobile-nav",
  },
  {
    label: "ETH is Money because...",
    icon: "gtp:eim-community",
    sectionId: "fifth-section",
    contentId: "fifth-content",
    linkId: "fifth-link",
    labelId: "fifth-label",
    mobileNavId: "fifth-mobile-nav",
  },
  {
    label: "Get notified to join the community",
    icon: "gtp:eim-explainer",
    sectionId: "sixth-section",
    contentId: "sixth-content",
    linkId: "sixth-link",
    labelId: "sixth-label",
    mobileNavId: "sixth-mobile-nav",
  },
  {
    label: "Questions and Glossary",
    description: "Find answers and explanations to terms you might not have heard before.",
    icon: "gtp:eim-faq",
    sectionId: "seventh-section",
    contentId: "seventh-content",
    linkId: "seventh-link",
    labelId: "seventh-label",
    mobileNavId: "seventh-mobile-nav",
  }

];