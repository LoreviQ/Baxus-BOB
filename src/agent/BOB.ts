import { AgentBuilder, systemProvider, AgentBuilderSettings } from "@olivertj/agent-builder"
import { BOBPrompts } from "@/agent/prompt"
import { barProvider} from "@/agent/providers"

export function buildBOB(username:string): AgentBuilder{
    const config : AgentBuilderSettings = {
        debug: true,
    }
    const bob = new AgentBuilder(BOBPrompts.PROMPT.prefix, config)
    bob.setProvider(systemProvider(BOBPrompts.SYSTEM.prefix))
    bob.setProvider(barProvider(username))
    return bob
}