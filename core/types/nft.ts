// ref https://docs.opensea.io/docs/metadata-standards#attributes
export interface NftMetadataAttribute {
  display_type?:
    | string
    | "number"
    | "boost_percentage"
    | "boost_number"
    | "date";
  trait_type?: string;
  value?: string | number;
}

// ref https://docs.opensea.io/docs/metadata-standards
export interface NftMetadata {
  image?: string;
  image_data?: string;
  external_url?: string;
  description?: string;
  name?: string;
  attributes?: NftMetadataAttribute[];
  background_color?: string;
  animation_url?: string;
  youtube_url?: string;
}
