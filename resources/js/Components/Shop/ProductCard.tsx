// ProductCard.tsx
import React from "react";

type ShopType = "amazon" | "rakuten" | "yahoo" | "jalan" | "jtb" | "knt" | "ikyu" | "rurubu";

interface ShopLink {
  type: ShopType;
  url: string;
  label: string;
}

export interface ProductCardProps {
  imageUrl: string;
  title: string;
  price?: string;
  shopName?: string;
  links: ShopLink[];
}

const ProductCard: React.FC<ProductCardProps> = ({ imageUrl, title, price, shopName, links }) => {
  return (
    <div className="cstmreba">
      <div className="kaerebalink-box">
        <div className="kaerebalink-image">
          <img src={imageUrl} alt={title} />
        </div>
        <div className="kaerebalink-info">
          <div className="kaerebalink-name">{title}</div>
          <div className="kaerebalink-detail"></div>
          {shopName && <div className="kaerebalink-detail">{shopName}</div>}
          {price && <div className="kaerebalink-detail">{price}</div>}
          <div className="kaerebalink-link1">
            {links.map((link) => (
              <div key={link.type} className={`shoplink${link.type}`}>
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              </div>
            ))}
          </div>
        </div>
        <div className="booklink-footer"></div>
      </div>
    </div>
  );
};

export default ProductCard;
