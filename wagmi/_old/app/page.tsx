import {Account} from '../../components/examples/Account'
import {Balance} from '../../components/examples/Balance'
import {BlockNumber} from '../../components/examples/BlockNumber'
import {ConnectButton} from '../../components/examples/ConnectButton'
import {Connected} from '../../components/examples/Connected'
import {NetworkSwitcher} from '../../components/examples/NetworkSwitcher'
import {ReadContract} from '../../components/examples/ReadContract'
import {ReadContracts} from '../../components/examples/ReadContracts'
import {ReadContractsInfinite} from '../../components/examples/ReadContractsInfinite'
import {SendTransaction} from '../../components/examples/SendTransaction'
import {SendTransactionPrepared} from '../../components/examples/SendTransactionPrepared'
import {SignMessage} from '../../components/examples/SignMessage'
import {SignTypedData} from '../../components/examples/SignTypedData'
import {USDCBalance} from '../../components/USDCBalance'
import {WatchContractEvents} from '../../components/examples/WatchContractEvents'
import {WatchPendingTransactions} from '../../components/examples/WatchPendingTransactions'
import {WriteContract} from '../../components/examples/WriteContract'
import {WriteContractPrepared} from '../../components/examples/WriteContractPrepared'

export function Page() {
  return (
    <>
      <h1>wagmi + RainbowKit + Next.js</h1>

      <ConnectButton/>

      <Connected>
        <hr/>
        <h2>Network</h2>
        <NetworkSwitcher/>
        <br/>
        <hr/>
        <h2>Account</h2>
        <Account/>
        <br/>
        <hr/>
        <h2>Balance</h2>
        <Balance/>
        <br/>
        <hr/>
        <h2>Block Number</h2>
        <BlockNumber/>
        <br/>
        <hr/>
        <h2>Read Contract</h2>
        <ReadContract/>
        <br/>
        <hr/>
        <h2>Read Contracts</h2>
        <ReadContracts/>
        <br/>
        <hr/>
        <h2>Read Contracts Infinite</h2>
        <ReadContractsInfinite/>
        <br/>
        <hr/>
        <h2>Send Transaction</h2>
        <SendTransaction/>
        <br/>
        <hr/>
        <h2>Send Transaction (Prepared)</h2>
        <SendTransactionPrepared/>
        <br/>
        <hr/>
        <h2>Sign Message</h2>
        <SignMessage/>
        <br/>
        <hr/>
        <h2>Sign Typed Data</h2>
        <SignTypedData/>
        <br/>
        <hr/>
        <h2>Token</h2>
        <USDCBalance/>
        <br/>
        <hr/>
        <h2>Watch Contract Events</h2>
        <WatchContractEvents/>
        <br/>
        <hr/>
        <h2>Watch Pending Transactions</h2>
        <WatchPendingTransactions/>
        <br/>
        <hr/>
        <h2>Write Contract</h2>
        <WriteContract/>
        <br/>
        <hr/>
        <h2>Write Contract (Prepared)</h2>
        <WriteContractPrepared/>
      </Connected>
    </>
  )
}

export default Page
