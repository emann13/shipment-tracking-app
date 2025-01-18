import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    EN: {
      translation: {
        hello: 'Hello',
        orderNumber: 'ORDER #',
        arrived: 'Arrived ' ,
        arrivingBy: 'Arriving by ',
        today: 'Today',
        orderDescriptionDelivered: 'Your order has arrived.',
        orderDescriptionNotDelivered: 'Your order is expected to arrive within {{expectedInDays}} - {{expectedInDaysPlusOne}} working days.',
        startTracking: 'Start Tracking by Entering your Order\'s Number',
        trackingDetails: 'Tracking details',
        pickedUp: 'Picked up',
        processing: 'Processing',
        outForDelivery: 'Out for Delivery',
        delivered: 'Delivered',
        pleaseEnterTrackingNumber: 'Please enter a tracking number!',
        search: 'Search',
        loading: 'Loading...',
        enterTrackingNumber: 'Enter your tracking number',
      },
    },
    AR: {
      translation: {
        hello: 'مرحبا',
        orderNumber: 'رقم الطلب #',
        arrived: 'وصل',
        arrivingBy: 'سيصل بحلول ',
        today: 'اليوم',
        orderDescriptionDelivered: 'طلبك قد وصل.',
        orderDescriptionNotDelivered: 'من المتوقع أن يصل طلبك في غضون {{expectedInDays}} - {{expectedInDaysPlusOne}} أيام عمل.',
        startTracking: 'ابدأ التتبع بإدخال رقم الطلب الخاص بك',
        trackingDetails: 'تفاصيل التتبع',
        pickedUp: 'تم الاستلام',
        processing: 'قيد المعالجة',
        outForDelivery: 'خارج للتسليم',
        delivered: 'تم التسليم',
        pleaseEnterTrackingNumber: 'يرجى إدخال رقم التتبع!',
        search: 'بحث',
        loading: 'جار التحميل...',
        enterTrackingNumber: 'أدخل رقم التتبع الخاص بك',
      },
    },
    FR: {
      translation: {
        hello: 'Bonjour',
        orderNumber: 'COMMANDE #',
        arrived: 'Arrivé ',
        arrivingBy: 'Arrivée prévue le ',
        today: 'Aujourd\'hui',
        orderDescriptionDelivered: 'Votre commande est arrivée.',
        orderDescriptionNotDelivered: 'Votre commande devrait arriver dans {{expectedInDays}} - {{expectedInDaysPlusOne}} jours ouvrables.',
        startTracking: 'Commencez à suivre en entrant votre numéro de commande',
        trackingDetails: 'Détails de suivi',
        pickedUp: 'Ramassé',
        processing: 'En traitement',
        outForDelivery: 'En cours de livraison',
        delivered: 'Livré',
        pleaseEnterTrackingNumber: 'Veuillez entrer un numéro de suivi!',
        search: 'Rechercher',
        loading: 'Chargement...',
        enterTrackingNumber: 'Entrez votre numéro de suivi',
      },
    },
  },
  lng: localStorage.getItem("lng") ? localStorage.getItem("lng") : "AR",
  fallbackLng: localStorage.getItem("lng") ? localStorage.getItem("lng") : "AR",
  interpolation: {
    escapeValue: false,
  },
});

i18n.on('languageChanged', (lng) => {
  if (lng === 'AR') {
    document.body.setAttribute('dir', 'rtl');
  } else {
    document.body.setAttribute('dir', 'ltr');
  }
});

export default i18n;
