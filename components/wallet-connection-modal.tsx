"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle, ExternalLink, Wallet, Download } from "lucide-react"

interface WalletConnectionModalProps {
  isOpen: boolean
  onClose: () => void
  connectionStep: number
}

export function WalletConnectionModal({ isOpen, onClose, connectionStep }: WalletConnectionModalProps) {
  const wallets = [
    {
      name: "MetaMask",
      icon: "🦊",
      description: "Most popular Ethereum wallet",
      url: "https://metamask.io/",
      color: "from-orange-500 to-yellow-500",
    },
    {
      name: "WalletConnect",
      icon: "🔗",
      description: "Connect with mobile wallets",
      url: "https://walletconnect.com/",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Coinbase Wallet",
      icon: "🔵",
      description: "Coinbase's self-custody wallet",
      url: "https://www.coinbase.com/wallet",
      color: "from-blue-600 to-indigo-600",
    },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gray-900 border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Connect Your Wallet
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            You need a Web3 wallet to access this platform. Choose one below to get started.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-6">
          {wallets.map((wallet, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full justify-between p-4 h-auto border-gray-600 hover:border-gray-500 hover:bg-gray-800 group"
              onClick={() => window.open(wallet.url, "_blank")}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full bg-gradient-to-r ${wallet.color} flex items-center justify-center text-lg`}
                >
                  {wallet.icon}
                </div>
                <div className="text-left">
                  <div className="text-white font-medium">{wallet.name}</div>
                  <div className="text-gray-400 text-sm">{wallet.description}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Download className="h-4 w-4 text-gray-400 group-hover:text-white" />
                <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-white" />
              </div>
            </Button>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <p className="text-blue-200 text-sm">
            <CheckCircle className="h-4 w-4 inline mr-2" />
            Once you install a wallet, refresh this page and click "Get Started" again.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
