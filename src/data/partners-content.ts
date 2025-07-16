// Partner page content - centralized for easy management
export const partnersContent = {
  // Testimonials data
  testimonials: {
    title: "What Our Partners Say",
    subtitle: "Hear from professionals who have joined our referral network",
    items: [
      {
        id: 1,
        quote: "The referral process is seamless. My clients receive exceptional service, and the commission structure is very competitive. It's a win-win partnership.",
        author: "Sarah Mitchell",
        title: "Financial Advisor",
        company: "Mitchell Wealth Management",
        image: "/images/testimonials/sarah-mitchell.jpg",
      },
      {
        id: 2,
        quote: "As a realtor, I can now offer my senior clients an alternative to downsizing that helps them stay in their homes. This service has increased my commission opportunities and strengthened my client relationships.",
        author: "James Rodriguez",
        title: "Senior Real Estate Specialist",
        company: "Premier Realty Group",
        image: "/images/testimonials/james-rodriguez.jpg",
      },
      {
        id: 3,
        quote: "The educational resources and training provided have made me confident in discussing reverse mortgages with my clients. The $450 referral fee opportunity has been a valuable addition to my practice.",
        author: "Patricia Chen",
        title: "CPA",
        company: "Chen & Associates",
        image: "/images/testimonials/patricia-chen.jpg",
      },
    ]
  },

  // Partner types data
  partnerTypes: {
    title: "Who We Partner With",
    subtitle: "We work with trusted professionals who share our commitment to helping seniors achieve financial security and peace of mind.",
    items: [
      {
        id: "advisor",
        title: "Financial Advisors",
        description: "Help clients optimize retirement income with home equity solutions.",
        color: "text-primary-600",
        bgColor: "bg-primary-50",
        borderColor: "border-primary-200",
        icon: "TrendingUp"
      },
      {
        id: "realtor",
        title: "Realtors",
        description: "Help your clients stay in their homes while you earn more commission from increased real estate sales through expanded service offerings.",
        color: "text-success-600",
        bgColor: "bg-success-50",
        borderColor: "border-success-200",
        icon: "Home"
      },
      {
        id: "cpa",
        title: "CPAs",
        description: "Provide tax-efficient retirement strategies using reverse mortgages.",
        color: "text-secondary-600",
        bgColor: "bg-secondary-50",
        borderColor: "border-secondary-200",
        icon: "Calculator"
      },
      {
        id: "attorney",
        title: "Elder Law Attorneys",
        description: "Protect assets and ensure financial security for elderly clients.",
        color: "text-purple-600",
        bgColor: "bg-purple-50",
        borderColor: "border-purple-200",
        icon: "Scale"
      }
    ],
    footer: {
      title: "Not seeing your profession? No problem!",
      subtitle: "We welcome all professionals who work with seniors and want to provide additional value to their clients."
    }
  },

  // Incentive/benefits data
  incentives: {
    title: "Earn More Than Just Commissions",
    mainIncentive: {
      amount: "$450",
      description: "Maximum Per Referral",
      subtitle: "For qualified mortgages $200k or more"
    },
    benefits: [
      {
        id: "materials",
        title: "Co-Branded Materials",
        description: "Professional marketing materials customized with your branding.",
        icon: "BookOpen"
      },
      {
        id: "training",
        title: "Exclusive Training",
        description: "Monthly webinars and certification programs to boost your expertise.",
        icon: "HeadphonesIcon"
      },
      {
        id: "marketing",
        title: "Marketing Support",
        description: "Lead generation tools and strategies to grow your referral pipeline.",
        icon: "Megaphone"
      }
    ],
    cta: {
      text: "Join our network today and start earning referral income"
    }
  },

  // Lead form content
  leadForm: {
    title: "Ready to Partner With Us?",
    subtitle: "Join our network of successful referral partners and start earning competitive commissions while helping your clients access their home equity.",
    formTitle: "Get Partner Details",
    benefits: [
      {
        title: "Quick Response Time",
        description: "We contact all referrals within 48 hours"
      },
      {
        title: "Transparent Process", 
        description: "Track your referrals through our partner portal"
      },
      {
        title: "Reliable Commissions",
        description: "Get paid 2-3 weeks after closing for processing"
      }
    ],
    disclaimer: "By submitting this form, you agree to our Terms of Service and Privacy Policy."
  }
}

// Type definitions for TypeScript support
export type PartnersContent = typeof partnersContent
export type Testimonial = typeof partnersContent.testimonials.items[0]
export type PartnerType = typeof partnersContent.partnerTypes.items[0]
export type Benefit = typeof partnersContent.incentives.benefits[0]