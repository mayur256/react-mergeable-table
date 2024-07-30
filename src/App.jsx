import { Mergeable } from "./components/Mergeable"
import { MergeableCtxProvider } from "./context/useMergeableCtx"
import { layout } from "./utils/data"

function App() {
  return (
    <MergeableCtxProvider>
      <div className="mergeable">
        <Mergeable layout={layout} />
      </div>
    </MergeableCtxProvider>
  )
}

export default App
