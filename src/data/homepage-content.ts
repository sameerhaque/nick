// Homepage content for senior-focused B2C landing page
export const homepageContent = {
  // Hero section - Trust-first approach
  hero: {
    title: "Stay in Your Home. Access Your Equity. Live Comfortably.",
    subtitle: "A flexible cushion against rising living costs. If you're 55+ and own your home in Ontario, you may qualify for a reverse mortgage to supplement your retirement income with tax-free funds.",
    phoneNumber: "(416) 555-7378",
    phoneText: "Call for Free Consultation",
    ctaPrimary: {
      text: "Calculate Your Amount",
      href: "/calculator"
    },
    ctaSecondary: {
      text: "Schedule Free Consultation",
      href: "/consultation"
    },
    trustBadges: [
      {
        text: "FSRA Licensed",
        icon: "Shield"
      },
      {
        text: "BBB A+ Rating",
        icon: "Certificate"
      },
      {
        text: "20+ Years in Canada",
        icon: "Award"
      },
      {
        text: "No Monthly Payments",
        icon: "Star"
      }
    ],
    stats: [
      {
        number: "5,000+",
        label: "Ontario Families Helped"
      },
      {
        number: "55+",
        label: "Age to Qualify"
      },
      {
        number: "$0",
        label: "Monthly Payments"
      }
    ]
  },

  // How It Works - Educational focus
  howItWorks: {
    title: "How a Reverse Mortgage Works",
    subtitle: "A simple, provincially-regulated way to access your home's value while continuing to live in it.",
    steps: [
      {
        id: "qualify",
        number: "1",
        title: "See If You Qualify",
        description: "Must be 55+, own your home, and have sufficient equity. Our free consultation determines your eligibility.",
        icon: "UserCheck"
      },
      {
        id: "learn",
        number: "2", 
        title: "Get Educated & Counseled",
        description: "Receive required financial counseling and detailed explanations. No obligation to proceed after learning.",
        icon: "BookOpen"
      },
      {
        id: "access",
        number: "3",
        title: "Access Your Funds",
        description: "Choose how to receive money: lump sum, monthly payments, or line of credit. You remain the homeowner.",
        icon: "DollarSign"
      }
    ],
    disclaimer: "This material has not been reviewed, approved or issued by OSFI, FSRA or any government agency."
  },

  // Key Benefits - What matters to seniors  
  benefits: {
    title: "Why Seniors Choose Reverse Mortgages",
    subtitle: "Access your home equity while maintaining ownership and independence.",
    items: [
      {
        id: "no-payments",
        title: "No Monthly Mortgage Payments",
        description: "Eliminate your current mortgage payment. Receive money instead of paying it out each month.",
        icon: "CreditCard",
        highlight: true
      },
      {
        id: "stay-home",
        title: "Stay in Your Home for Life",
        description: "You remain the owner of your home. Continue living in the place you love independently.",
        icon: "Home",
        highlight: true
      },
      {
        id: "tax-free",
        title: "Tax-Free Income",
        description: "Reverse mortgage proceeds are typically not considered taxable income by the CRA.",
        icon: "Receipt",
        highlight: false
      },
      {
        id: "provincially-regulated",
        title: "Provincial Insurance Protection", 
        description: "Most reverse mortgages are regulated by provincial financial authorities for your protection.",
        icon: "Shield",
        highlight: false
      },
      {
        id: "flexible-payout",
        title: "Flexible Payment Options",
        description: "Choose lump sum, monthly payments, line of credit, or combination to meet your needs.",
        icon: "Settings",
        highlight: false
      },
      {
        id: "non-recourse",
        title: "Never Owe More Than Home Value",
        description: "You or your heirs will never owe more than the home is worth when the loan becomes due.",
        icon: "CheckCircle",
        highlight: false
      }
    ]
  },

  // Safety & Protection - Address fears
  safety: {
    title: "Your Safety & Protection",
    subtitle: "Government oversight and built-in protections ensure your interests are protected.",
    features: [
      {
        id: "ownership",
        title: "You Remain the Owner",
        description: "Your name stays on the deed. You can sell, refinance, or leave the home to heirs at any time.",
        icon: "Key"
      },
      {
        id: "counseling",
        title: "Required Independent Counseling",
        description: "Licensed financial counselors explain all aspects before you sign. This protects your interests.",
        icon: "Users"
      },
      {
        id: "spouse-protection",
        title: "Eligible Spouse Protection",
        description: "Qualifying spouses may remain in the home even if the borrower passes away first.",
        icon: "Heart"
      },
      {
        id: "right-rescind",
        title: "3-Day Right of Rescission",
        description: "You have 3 business days after closing to cancel the loan for any reason, no questions asked.",
        icon: "RotateCcw"
      }
    ]
  },

  // Client Testimonials - Build trust with real stories
  testimonials: {
    title: "Real Stories from Real Clients",
    subtitle: "Hear how reverse mortgages have helped seniors live more comfortably in their own homes.",
    items: [
      {
        id: 1,
        quote: "We eliminated our $1,200 monthly mortgage payment and now receive $850 per month. It's like getting a $2,000 raise every month.",
        author: "Mary & Robert Thompson",
        age: "Ages 68 & 70",
        location: "Toronto, ON",
        benefit: "Eliminated mortgage payment + monthly income",
        image: "/images/testimonials/thompson-couple.jpg"
      },
      {
        id: 2,
        quote: "My adult children were initially worried, but after learning about the protections and counseling, they're completely supportive. It's given me the financial freedom I needed.",
        author: "Dorothy Martinez",
        age: "Age 72",
        location: "Vancouver, BC", 
        benefit: "Financial independence + family peace of mind",
        image: "/images/testimonials/dorothy-martinez.jpg"
      },
      {
        id: 3,
        quote: "The counseling process really educated us. We felt comfortable knowing we'd never owe more than our home's worth and could stay here as long as we want.",
        author: "Frank & Susan Chen",
        age: "Ages 65 & 63",
        location: "Calgary, AB",
        benefit: "Education + security + staying in home",
        image: "/images/testimonials/chen-couple.jpg"
      }
    ]
  },

  // FAQ - Address common concerns
  faq: {
    title: "Common Questions & Concerns",
    subtitle: "Get honest answers to the questions families ask most about reverse mortgages.",
    categories: [
      {
        id: "ownership",
        title: "Home Ownership & Control",
        questions: [
          {
            question: "Will I lose ownership of my home?",
            answer: "No. You remain the owner of your home. Your name stays on the deed, and you can sell, refinance, or leave the home to your heirs at any time."
          },
          {
            question: "Can the bank take my home away?",
            answer: "No, as long as you meet the loan obligations: living in the home as your primary residence, maintaining the property, and paying property taxes and insurance."
          }
        ]
      },
      {
        id: "family",
        title: "Impact on Family & Heirs",
        questions: [
          {
            question: "What happens to my children's inheritance?",
            answer: "Your heirs have options: they can pay off the loan and keep the home, sell the home and keep any remaining equity, or simply walk away with no obligation."
          },
          {
            question: "Will my heirs owe more than the home is worth?",
            answer: "No. This is a non-recourse loan, meaning you or your heirs will never owe more than the home's appraised value when the loan becomes due."
          }
        ]
      },
      {
        id: "money",
        title: "Loan Amounts & Costs",
        questions: [
          {
            question: "How much money can I get?",
            answer: "The amount depends on your age, home value, current interest rates, and existing mortgage balance. Generally, the older you are and the more valuable your home, the more you can borrow."
          },
          {
            question: "What are the costs and fees?",
            answer: "Costs include origination fees, mortgage insurance premiums, appraisal, title insurance, and closing costs. Many of these can be financed into the loan."
          }
        ]
      }
    ]
  },

  // Expert Credentials - Build credibility
  credentials: {
    title: "Your Trusted Reverse Mortgage Experts",
    subtitle: "Licensed professionals with decades of experience helping seniors access home equity safely.",
    company: {
      name: "Reverse Way Home",
      founded: "2003",
      license: "FSRA #123456",
      bbb: "A+",
      clientsServed: "10,000+",
      provinces: "Licensed across Canada"
    },
    certifications: [
      "FSRA-Licensed Lender",
      "Provincial-Registered Counseling Provider", 
      "NRMLA Member",
      "Better Business Bureau A+ Rating"
    ],
    team: {
      title: "Meet Your Expert Team",
      description: "Our experienced loan officers and counselors are here to guide you through every step of the reverse mortgage process.",
      expertise: [
        "20+ Years Industry Experience",
        "Certified Reverse Mortgage Professionals",
        "Licensed Financial Counselors on Staff",
        "Multilingual Support Available"
      ]
    }
  },

  // Contact Section - Multiple ways to get help
  contact: {
    title: "Get Your Questions Answered",
    subtitle: "Speak with a licensed professional or request your free information kit.",
    phoneNumber: "(855) 555-7378",
    phoneHours: "Mon-Fri 8AM-8PM, Sat 9AM-5PM EST",
    options: [
      {
        id: "phone",
        title: "Call for Immediate Help",
        description: "Speak with a licensed loan officer right now",
        action: "Call (855) 555-7378",
        icon: "Phone",
        primary: true
      },
      {
        id: "calculator",
        title: "Free Calculator",
        description: "Get your estimate in minutes",
        action: "Calculate Now",
        icon: "Calculator",
        primary: false
      },
      {
        id: "consultation",
        title: "Free In-Home Consultation",
        description: "Expert visits your home at your convenience",
        action: "Schedule Visit",
        icon: "Calendar",
        primary: false
      }
    ],
    guarantees: [
      "No obligation consultation",
      "All information kept confidential",
      "Licensed professionals only",
      "No high-pressure sales tactics"
    ]
  }
}

// Type definitions for TypeScript support
export type HomepageContent = typeof homepageContent
export type HeroContent = typeof homepageContent.hero
export type TestimonialItem = typeof homepageContent.testimonials.items[0]
export type BenefitItem = typeof homepageContent.benefits.items[0] 
export type FAQCategory = typeof homepageContent.faq.categories[0]