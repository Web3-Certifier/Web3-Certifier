import React from 'react';
import { BookOpen, Award, Coins, Zap, Shield, Users, TrendingUp, Target, CheckCircle, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-base-200">
        <div className="max-w-7xl mx-auto px-6 py-24 sm:py-32">
          <div className="text-center">
            <h1 className="text-5xl sm:text-7xl font-extrabold mb-6 leading-tight text-base-100">
              Web3 Certifier
            </h1>
            <p className="text-2xl sm:text-3xl font-bold mb-6 text-base-content">
              The Permissionless Learn-to-Earn Platform
            </p>
            <p className="text-lg sm:text-xl max-w-4xl mx-auto mb-12 text-base-content/80 leading-relaxed">
              Web3 Certifier is the permissionless learn-to-earn platform that enables Web3 protocols to efficiently reward users for their knowledge and on-chain activity.
            </p>
            <div className="flex flex-col sm:flex-row md:flex-row gap-6 justify-center justify-items-center mt-8">
              <a href="/search_exams" className="flex justify-center">
                <button className="group bg-base-100 hover:bg-base-content text-base-200 font-bold py-5 px-10 rounded-full text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 flex items-center justify-center gap-3">
                  Start Learning & Earning
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </a>
              <a href="/organize_exams">
                <button className="bg-white hover:bg-base-100 border-2 border-primary text-base-200 font-bold py-5 px-10 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                  Create Educational Campaigns
                </button>
              </a>
            </div>
          </div>
        </div>
        
        {/* Floating Stats */}
        <div className="max-w-5xl mx-auto px-6 pb-16">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white backdrop-blur rounded-2xl p-6 text-center shadow-lg border border-base-300">
              <div className="text-3xl font-bold text-primary mb-1">Permissionless</div>
              <div className="text-sm text-base-200">Anyone can create or take</div>
            </div>
            <div className="bg-white backdrop-blur rounded-2xl p-6 text-center shadow-lg border border-base-300">
              <div className="text-3xl font-bold text-primary mb-1">Custom Rewards</div>
              <div className="text-sm text-base-200">Based on on-chain activity</div>
            </div>
            <div className="bg-white backdrop-blur rounded-2xl p-6 text-center shadow-lg border border-base-300">
              <div className="text-3xl font-bold text-primary mb-1">NFT Certificates</div>
              <div className="text-sm text-base-200">Verifiable proof of knowledge</div>
            </div>
          </div>
        </div>
      </div>

      {/* Dual Value Proposition */}
      <div className="bg-base-100 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-base-content mb-4">Built for Two Audiences</h2>
            <p className="text-xl text-primary">Different goals, unified platform</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* For Users */}
            <div className="bg-white rounded-3xl p-8 border-2 border-primary/20 hover:border-primary/40 transition-all shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-primary text-white p-3 rounded-xl">
                  <Coins className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-base-200">For Learners</h3>
              </div>
              <p className="text-lg mb-6 text-base-200">
                Earn money and knowledge about Web3 protocols by completing educational challenges and proving your skills on-chain.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <span className="text-base-200"><strong className="text-base-200">Earn tokens</strong> for learning and passing exams</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <span className="text-base-200"><strong className="text-base-200">Receive NFT certificates</strong> as verifiable proof</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <span className="text-base-200"><strong className="text-base-200">Unlock higher rewards</strong> based on your on-chain activity</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <span className="text-base-200"><strong className="text-base-200">Discover new protocols</strong> and dApps to interact with</span>
                </li>
              </ul>
              <a href="/search_exams">
                <button className="mt-8 w-full bg-primary hover:bg-primary-focus text-white font-semibold py-4 rounded-xl transition-all">
                  Browse Available Exams
                </button>
              </a>
            </div>

            {/* For Organizations */}
            <div className="bg-white rounded-3xl p-8 border-2 border-secondary/20 hover:border-secondary/40 transition-all shadow-lg">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-secondary text-white p-3 rounded-xl">
                  <Target className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-base-200">For Organizations</h3>
              </div>
              <p className="text-lg mb-6 text-base-200">
                Use Web3 Certifier as your educational-marketing platform to acquire users and spread awareness efficiently.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                  <span className="text-base-200"><strong className="text-base-200">Reward knowledge</strong> about your protocol or product</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                  <span className="text-base-200"><strong className="text-base-200">Custom reward structures</strong> based on user&apos;s on-chain metrics</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                  <span className="text-base-200"><strong className="text-base-200">Acquire educated users</strong> who understand your product</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                  <span className="text-base-200"><strong className="text-base-200">Permissionless creation</strong> with default templates available</span>
                </li>
              </ul>
              <a href="/organize_exams">
                <button className="mt-8 w-full bg-secondary hover:bg-secondary-focus text-white font-semibold py-4 rounded-xl transition-all">
                  Create Your Campaign
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-primary py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-base-content mb-4">How It Works</h2>
            <p className="text-xl text-base-content/70">Simple process, powerful results</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow h-full border border-base-300">
                <div className="bg-primary text-white w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold mb-6">
                  1
                </div>
                <BookOpen className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-3 text-base-200">Learn & Prepare</h3>
                <p className="text-base-200">
                  Browse available exams on topics ranging from DeFi to NFTs. Study the material and prepare to prove your knowledge.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow h-full border border-base-300">
                <div className="bg-primary text-white w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold mb-6">
                  2
                </div>
                <Zap className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-3 text-base-200">Take Exam & Pass</h3>
                <p className="text-base-200">
                  Complete the exam by answering questions. Your on-chain activity may unlock bonus rewards based on the campaign&apos;s criteria.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow h-full border border-base-300">
                <div className="bg-primary text-white w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold mb-6">
                  3
                </div>
                <Award className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-2xl font-bold mb-3 text-base-200">Earn Rewards & NFT</h3>
                <p className="text-base-200">
                  Receive token rewards and an NFT certificate proving your knowledge. Share your achievement and build your on-chain reputation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Unique Features */}
      <div className="bg-base-200 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Unique Reward Mechanisms</h2>
            <p className="text-xl text-white/80">Incentivize the right users for your protocol</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
              <TrendingUp className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-3">Activity-Based Rewards</h3>
              <p className="text-white/80">
                Set rewards based on users&apos; staking amounts, transaction volume, or any other on-chain metric relevant to your protocol.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
              <Users className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-3">Targeted Acquisition</h3>
              <p className="text-white/80">
                Reward power users more than newcomers, or vice versa. Create tiered incentives that align with your growth strategy.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
              <Zap className="w-12 h-12 mb-4" />
              <h3 className="text-2xl font-bold mb-3">Default Templates</h3>
              <p className="text-white/80">
                Get started quickly with pre-configured reward structures, or create fully custom logic permissionlessly.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-block bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
              <h4 className="text-2xl font-bold mb-3">Example: Reward Stakers More</h4>
              <p className="text-white/80 mb-4">
                An organization can set: &quot;Users with 100+ tokens staked get 10 tokens reward, users with 10-99 staked get 5 tokens, and new users get 2 tokens.&quot;
              </p>
              <p className="text-sm text-white/60">
                This ensures you&apos;re rewarding your most engaged community members while still attracting new users.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why Blockchain */}
      <div className="bg-base-100 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-base-content mb-4">Why Web3?</h2>
            <p className="text-xl text-primary">Blockchain powers trust, transparency, and incentives</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-8 h-8 text-base-200" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-base-content">On-Chain Metrics</h3>
              <p className="text-base-content">
                Leverage blockchain data to create sophisticated, targeted reward structures based on real user activity.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-base-200" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-base-content">Verifiable Certificates</h3>
              <p className="text-base-content">
                NFT certificates provide permanent, tamper-proof records of achievement that anyone can verify on-chain.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Coins className="w-8 h-8 text-base-200" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-base-content">Direct Rewards</h3>
              <p className="text-base-content">
                Instant, transparent token distribution with no intermediaries. Smart contracts ensure fair payouts.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tutorial Section */}
      {/* <div className="bg-primary py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-base-content mb-4">See It In Action</h2>
            <p className="text-xl text-base-content/70">Watch how Web3 Certifier works</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="aspect-video rounded-3xl overflow-hidden shadow-2xl">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/8lyoX_Z1x2w" 
                title="Web3 Certifier Tutorial" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>
              </iframe>
            </div>
          </div>
        </div>
      </div> */}

      {/* Final CTA */}
      <div className="bg-base-200 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-10 text-white/90">
            Join the permissionless learn-to-earn revolution today
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a href="/search_exams">
              <button className="bg-white text-base-100 hover:bg-base-200 hover:border-white hover:border-2 font-bold py-5 px-10 rounded-full text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200">
                Find Exams to Take
              </button>
            </a>
            <a href="/organize_exams">
              <button className="bg-transparent border-2 border-white text-base-100 hover:bg-white font-bold py-5 px-10 rounded-full text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200">
                Create a Campaign
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;