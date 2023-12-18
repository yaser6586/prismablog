import { Nunito , Manrope , PT_Serif, Smooch_Sans, Noto_Kufi_Arabic} from 'next/font/google';
 
export const nunito = Nunito({ subsets: ['latin'] });
export const manrope = Manrope({ subsets: ['latin'] });
export const ptserif = PT_Serif({ weight: ['400', '700'], subsets : ['latin'] });
export const smoochSans = Smooch_Sans({ subsets: ['latin'] });
export const notoKufi = Noto_Kufi_Arabic({ subsets: ['arabic'] });