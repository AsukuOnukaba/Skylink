export type WorkProject = {
  id: string;
  title: string;
  place: string;
  summary: string;
  imageSrc: string;
  imageAlt: string;
  servicePath: string;
  serviceLabel: string;
};

/**
 * Field photographs and notes from the DataGram installation library.
 * Shown with permission. They record DataGram jobs, not Skylink case studies.
 */
export const workProjects: WorkProject[] = [
  {
    id: "nns-sagbama",
    title: "Nigeria Navy Ship — NNS Sagbama",
    place: "Sagbama, Bayelsa State",
    summary:
      "A high-performance Starlink terminal fitted on NNS Sagbama for shipboard communications. The source describes a commissioned naval vessel, not a pleasure craft.",
    imageSrc: "/images/work/nns-sagbama.jpeg",
    imageAlt:
      "Starlink high-performance dish on Nigeria Navy Ship NNS Sagbama, photographed in the DataGram installation library",
    servicePath: "/services/maritime-offshore",
    serviceLabel: "Maritime and offshore",
  },
  {
    id: "warri-houseboat",
    title: "Houseboat — Warri",
    place: "Warri, Delta State",
    summary:
      "High-performance kit on a houseboat in Warri, with Wi-Fi run through the accommodation. The source notes residential use on the water, including cable routing inside the boat.",
    imageSrc: "/images/work/warri-houseboat.jpeg",
    imageAlt:
      "Starlink high-performance dish mounted on a houseboat in Warri, Delta State",
    servicePath: "/services/boat-installation",
    serviceLabel: "Boat installation",
  },
  {
    id: "royal-fouche",
    title: "Royal Fouche — Degema",
    place: "Degema, Rivers State",
    summary:
      "Enterprise high-performance deployment for Royal Fouche at Degema, with network configuration and Wi-Fi across the premises.",
    imageSrc: "/images/work/royal-fouche-degema.jpeg",
    imageAlt:
      "Starlink high-performance installation at the Royal Fouche site in Degema, Rivers State",
    servicePath: "/services/enterprise-marine-hub",
    serviceLabel: "Enterprise and marine hub",
  },
  {
    id: "enval",
    title: "Enval Nigeria Ltd",
    place: "Nigeria",
    summary:
      "High-performance kit installed for Enval Nigeria Ltd. The source does not publish a street address, so this page does not invent one.",
    imageSrc: "/images/work/enval.jpeg",
    imageAlt:
      "Starlink high-performance terminal at an Enval Nigeria Ltd site",
    servicePath: "/services/business-connectivity",
    serviceLabel: "Business connectivity",
  },
  {
    id: "ncc-rivers",
    title: "NCC zonal office",
    place: "Rivers State",
    summary:
      "Starlink and mesh Wi-Fi for the NCC zonal office in Rivers State, described in the source as a government office deployment.",
    imageSrc: "/images/work/ncc-rivers.jpeg",
    imageAlt:
      "Starlink installation for the NCC zonal office in Rivers State",
    servicePath: "/services/wifi-networking",
    serviceLabel: "Whole-premises Wi-Fi",
  },
  {
    id: "coastal-houseboat",
    title: "Coastal houseboat",
    place: "Nigeria",
    summary:
      "High-performance kit on a coastal houseboat. The source describes on-water living and working space and does not name the marina.",
    imageSrc: "/images/work/coastal-houseboat.jpeg",
    imageAlt: "Starlink high-performance kit on a coastal houseboat",
    servicePath: "/services/boat-installation",
    serviceLabel: "Boat installation",
  },
  {
    id: "ph-home",
    title: "Residential install — Port Harcourt",
    place: "Port Harcourt, Rivers State",
    summary:
      "Standard kit on a Port Harcourt home, with mesh used for whole-home coverage. The source does not name the street or the household.",
    imageSrc: "/images/work/ph-home.jpeg",
    imageAlt: "Starlink dish on a residential roof in Port Harcourt",
    servicePath: "/services/residential-installation",
    serviceLabel: "Residential installation",
  },
  {
    id: "abuja-estate",
    title: "Multi-unit estate — Abuja",
    place: "Abuja, FCT",
    summary:
      "Estate deployment in Abuja described with Priority-plan activation and mesh across multiple units. Unit count and estate name are not in the source.",
    imageSrc: "/images/work/abuja-estate.jpeg",
    imageAlt: "Starlink dish mounted for a multi-unit estate in Abuja",
    servicePath: "/services/estate-wifi",
    serviceLabel: "Estate Wi-Fi",
  },
  {
    id: "arochukwu-duplex",
    title: "5-bedroom duplex — Arochukwu",
    place: "Arochukwu, Abia State",
    summary:
      "Standard kit and mesh across a 5-bedroom duplex in Arochukwu. The source presents this as whole-home coverage from one Starlink connection.",
    imageSrc: "/images/work/arochukwu-duplex.jpeg",
    imageAlt:
      "Starlink installation on a 5-bedroom duplex in Arochukwu, Abia State",
    servicePath: "/services/residential-installation",
    serviceLabel: "Residential installation",
  },
];
