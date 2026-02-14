import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Service from '../models/Service';
import Testimonial from '../models/Testimonial';
import FAQ from '../models/FAQ';

dotenv.config();

const seedData = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/reinsure';
    await mongoose.connect(mongoURI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Service.deleteMany({});
    await Testimonial.deleteMany({});
    await FAQ.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Seed Services
    const services = [
      {
        title: 'Commercial Vehicle Insurance',
        description: 'Comprehensive insurance coverage for all types of commercial vehicles including goods carriers, taxis, and buses.',
        icon: 'Truck',
        category: 'vehicle',
        order: 1,
        isActive: true,
        emiAvailable: true,
        subTypes: ['Goods Carrying', 'Taxi (up to 6 passengers)', 'Bus', 'Others'],
        features: [
          'Best Price Guarantee',
          'Easy EMI Options',
          'Third Party & Comprehensive Coverage',
          'Owner-Driver Personal Accident',
          'Quick Claim Settlement',
          '24/7 Support'
        ]
      },
      {
        title: 'Two Wheeler Insurance',
        description: 'Complete protection for your bike or scooter with comprehensive and third-party coverage options.',
        icon: 'Bike',
        category: 'vehicle',
        order: 2,
        isActive: true,
        emiAvailable: true,
        subTypes: ['Bike', 'Scooter'],
        features: [
          'Best Price Guarantee',
          'Easy EMI Options',
          'Comprehensive & Third Party Plans',
          'Personal Accident Cover',
          'Instant Policy Issuance',
          'Doorstep Service'
        ]
      },
      {
        title: 'Long Term Two Wheeler Insurance',
        description: 'Save more with multi-year insurance plans for your two-wheeler. No renewal hassle for 2, 3, or 5 years.',
        icon: 'Calendar',
        category: 'vehicle',
        order: 3,
        isActive: true,
        emiAvailable: true,
        subTypes: ['2 Year Plan', '3 Year Plan', '5 Year Plan'],
        features: [
          'Long-term Savings',
          'No Renewal Hassle',
          'Easy EMI Options',
          'Locked-in Premium Rates',
          'Comprehensive Coverage',
          'Free Add-ons'
        ]
      },
      {
        title: 'Health Insurance',
        description: 'Comprehensive health coverage for you and your family with cashless treatment and extensive hospital network.',
        icon: 'Heart',
        category: 'health',
        order: 4,
        isActive: true,
        emiAvailable: true,
        subTypes: ['Individual', 'Family Floater', 'Senior Citizen'],
        features: [
          'Cashless Treatment',
          'Easy EMI Options',
          'Pre & Post Hospitalization',
          'No Claim Bonus',
          'Tax Benefits',
          'Wide Hospital Network'
        ]
      }
    ];

    await Service.insertMany(services);
    console.log('✅ Seeded services');

    // Seed Testimonials
    const testimonials = [
      {
        name: 'Rajesh Kumar',
        role: 'Fleet Owner, Delhi',
        text: 'Fast claim processing and personal attention. Reinsure made my commercial vehicle insurance hassle-free. Highly recommended!',
        rating: 5,
        isApproved: true,
        order: 1,
      },
      {
        name: 'Priya Sharma',
        role: 'Business Owner, Mumbai',
        text: 'The EMI facility and transparent pricing won me over. I\'ve been with Reinsure for 3 years and counting.',
        rating: 5,
        isApproved: true,
        order: 2,
      },
      {
        name: 'Anil Mehta',
        role: 'Transport Company, Jaipur',
        text: 'Their 24/7 claim support saved me during an emergency. Professional, quick, and genuinely caring.',
        rating: 5,
        isApproved: true,
        order: 3,
      },
      {
        name: 'Sunita Verma',
        role: 'Individual Policyholder, Bangalore',
        text: 'I never thought insurance could be this simple. The team at Reinsure explained everything clearly and I got covered the same day.',
        rating: 5,
        isApproved: true,
        order: 4,
      },
    ];

    await Testimonial.insertMany(testimonials);
    console.log('✅ Seeded testimonials');

    // Seed FAQs
    const faqs = [
      {
        question: 'What types of insurance do you offer?',
        answer: 'We specialize in commercial vehicle insurance, two-wheeler insurance (including long-term plans), and health insurance. We offer both comprehensive and third-party coverage options with flexible EMI plans.',
        category: 'general',
        order: 1,
        isActive: true,
      },
      {
        question: 'How fast is the claim settlement process?',
        answer: 'Most claims are processed within 7-10 working days. Our dedicated claim support team assists you via phone and WhatsApp throughout the entire process.',
        category: 'claims',
        order: 2,
        isActive: true,
      },
      {
        question: 'Can I pay my premium in installments?',
        answer: 'Yes! We offer flexible EMI and part-payment options for all our insurance products so you can get covered without any financial burden.',
        category: 'payment',
        order: 3,
        isActive: true,
      },
      {
        question: 'Do you provide roadside assistance?',
        answer: 'Absolutely. Our comprehensive vehicle insurance plans include 24/7 roadside assistance and doorstep vehicle support across India.',
        category: 'vehicle',
        order: 4,
        isActive: true,
      },
      {
        question: 'How do I get a quote?',
        answer: 'Simply click on any insurance service card and fill out the quote form with your details. You\'ll receive a competitive quote within minutes from our expert advisors.',
        category: 'general',
        order: 5,
        isActive: true,
      },
      {
        question: 'What is the difference between comprehensive and third-party insurance?',
        answer: 'Third-party insurance covers damages to other vehicles and people, which is mandatory by law. Comprehensive insurance covers both third-party damages and your own vehicle damages including theft, fire, natural disasters, and accidents.',
        category: 'vehicle',
        order: 6,
        isActive: true,
      },
      {
        question: 'What documents do I need to purchase insurance?',
        answer: 'For vehicle insurance, you need your vehicle RC (Registration Certificate), previous policy copy (for renewal), and valid ID proof. For health insurance, you need age proof, ID proof, and medical reports if applicable.',
        category: 'general',
        order: 7,
        isActive: true,
      },
      {
        question: 'Can I renew my policy after it expires?',
        answer: 'Yes, but it\'s recommended to renew before expiry to avoid penalties and maintain continuous coverage. If your policy has expired, you may need to get your vehicle inspected before renewal.',
        category: 'renewal',
        order: 8,
        isActive: true,
      },
      {
        question: 'What are the benefits of long-term two-wheeler insurance?',
        answer: 'Long-term plans (2, 3, or 5 years) offer significant savings, locked-in premium rates, no annual renewal hassle, and protection against premium hikes. You also get easy EMI options to spread the cost.',
        category: 'vehicle',
        order: 9,
        isActive: true,
      },
      {
        question: 'Is personal accident cover included in vehicle insurance?',
        answer: 'Yes, owner-driver personal accident cover of ₹15 lakhs is mandatory and included in all vehicle insurance policies. You can also opt for additional passenger cover.',
        category: 'vehicle',
        order: 10,
        isActive: true,
      },
      {
        question: 'What is No Claim Bonus (NCB)?',
        answer: 'NCB is a discount on your premium for every claim-free year, ranging from 20% to 50%. It\'s applicable on own damage premium and can be transferred when you change vehicles or insurers.',
        category: 'vehicle',
        order: 11,
        isActive: true,
      },
      {
        question: 'Does health insurance cover pre-existing diseases?',
        answer: 'Yes, but typically after a waiting period of 2-4 years depending on the policy. Some critical illnesses may have specific waiting periods. It\'s important to disclose all pre-existing conditions at the time of purchase.',
        category: 'health',
        order: 12,
        isActive: true,
      },
      {
        question: 'How do I file a claim?',
        answer: 'Contact us immediately after an incident via phone or WhatsApp. Our team will guide you through the process, help with documentation, and coordinate with the insurance company for quick settlement.',
        category: 'claims',
        order: 13,
        isActive: true,
      },
      {
        question: 'Can I transfer my insurance to a new vehicle?',
        answer: 'No, vehicle insurance is specific to the registered vehicle. However, you can transfer your No Claim Bonus (NCB) to a new vehicle when you purchase a new policy.',
        category: 'vehicle',
        order: 14,
        isActive: true,
      },
      {
        question: 'Can I cancel my policy and get a refund?',
        answer: 'Yes, you can cancel your policy. Refund is calculated on a pro-rata basis for the unused period, minus applicable charges. The process and refund amount depend on your insurer\'s terms and conditions.',
        category: 'general',
        order: 15,
        isActive: true,
      },
    ];

    await FAQ.insertMany(faqs);
    console.log('✅ Seeded FAQs');

    console.log('🎉 Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
