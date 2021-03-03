import PopUpComp from './components/generic/pop-up/PopUp'
import CouponSectionComp from './components/page/product/coupon/section/CouponSection'
import CouponsPageComp from './components/page/coupons/CouponsPage'
import ScanPageComp from './components/page/scan/ScanPage'
import BarCodePageComp from './components/page/bar-code/BarCodePage'
import StripePageComp from './components/page/stripe/Stripe'
import SpinnerComp from './components/generic/spinner/Spinner'
import { api as apiObj } from './utils/api'
import { storage as storageObj } from './utils/storage'

export const PopUp = PopUpComp
export const CouponSection = CouponSectionComp
export const CouponsPage = CouponsPageComp
export const ScanPage = ScanPageComp
export const BarCodePage = BarCodePageComp
export const StripePage = StripePageComp
export const Spinner = SpinnerComp
export const api = apiObj
export const storage = storageObj
