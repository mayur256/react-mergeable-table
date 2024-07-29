import { Mergeable } from "./components/Mergeable"
import { MergeableCtxProvider } from "./context/useMergeableCtx"
import { layout } from "./utils/data"

function App() {
  return (
    <MergeableCtxProvider>
      <Mergeable layout={layout} />
    </MergeableCtxProvider>
  )
}

export default App
