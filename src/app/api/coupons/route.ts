import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { json, error } from '@/lib/api-utils';

export async function POST(request: NextRequest) {
  try {
    const { code, subtotal } = await request.json();

    if (!code) {
      return error('Coupon code is required');
    }

    const coupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase() },
    });

    if (!coupon) {
      return json({
        valid: false,
        message: 'Invalid coupon code',
      });
    }

    if (!coupon.isActive) {
      return json({
        valid: false,
        message: 'This coupon is no longer active',
      });
    }

    const now = new Date();
    if (now < coupon.validFrom) {
      return json({
        valid: false,
        message: 'This coupon is not yet valid',
      });
    }

    if (now > coupon.validUntil) {
      return json({
        valid: false,
        message: 'This coupon has expired',
      });
    }

    if (coupon.maxUses !== null && coupon.usedCount >= coupon.maxUses) {
      return json({
        valid: false,
        message: 'This coupon has reached its usage limit',
      });
    }

    if (coupon.minAmount && subtotal < Number(coupon.minAmount) * 100) {
      const minAmountFormatted = (Number(coupon.minAmount)).toFixed(2);
      return json({
        valid: false,
        message: `Minimum order amount of $${minAmountFormatted} required`,
      });
    }

    const discountAmount =
      coupon.type === 'PERCENTAGE'
        ? Math.round((subtotal * Number(coupon.value)) / 100)
        : Number(coupon.value) * 100;

    return json({
      valid: true,
      coupon: {
        id: coupon.id,
        code: coupon.code,
        type: coupon.type,
        value: Number(coupon.value),
        minAmount: coupon.minAmount ? Number(coupon.minAmount) : undefined,
        maxUses: coupon.maxUses ?? undefined,
        usedCount: coupon.usedCount,
        validFrom: coupon.validFrom,
        validUntil: coupon.validUntil,
        isActive: coupon.isActive,
      },
      discountAmount,
      message: 'Coupon applied successfully',
    });
  } catch (err) {
    console.error('POST /api/coupons/validate error:', err);
    return error('Failed to validate coupon', 500);
  }
}
