'use client';

import Marquee from 'react-fast-marquee';

interface Product {
    id: number;
    slug: string;
    nameBn: string;
    unit: string;
    image: string;
    today: number;
    change: {
        dir: 'up' | 'down';
        pct: number;
    };
}

interface PriceTickerProps {
    products: Product[];
}

export default function PriceTicker({ products }: PriceTickerProps) {
    if (!products || products.length === 0) return null;

    return (
        <div className="w-full bg-[#f9fafb] border-t border-b border-gray-200 py-2.5">
            <div className="w-full mx-auto">
                <Marquee gradient={false} speed={40} pauseOnHover={true} direction="left">
                    <div className="flex items-center gap-10 px-4">
                        {products.map((product) => {
                            const isUp = product.change.dir === 'up';
                            const unitBn = product.unit === 'kg' ? 'কেজি' : product.unit;

                            return (
                                <div key={product.id} className="flex items-center gap-2 text-sm font-medium text-gray-800 whitespace-nowrap">
                                    <span className="text-base">{product.image}</span>
                                    <span>{product.nameBn}</span>
                                    <span className="font-semibold text-gray-900">{product.today} টাকা/{unitBn}</span>
                                    <span className={`flex items-center gap-0.5 font-bold ${isUp ? 'text-red-600' : 'text-[#008848]'}`}>
                                        {isUp ? '▲' : '▼'} {product.change.pct}%
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </Marquee>
            </div>
        </div>
    );
}