import { AgentBuilder, systemProvider, AgentBuilderSettings } from "@olivertj/agent-builder"
import { BOBPrompts, barProvider, datasetProvider, knowledgeProvider, messageHistoryProvider } from "@/agent"

export async function buildBOB(username:string, thread:string): Promise<AgentBuilder> {
    const config : AgentBuilderSettings = {
        debug: true,
    }
    const bob = new AgentBuilder(BOBPrompts.PROMPT.prefix, config)
    bob.setProvider(systemProvider(BOBPrompts.SYSTEM.prefix))
    bob.setProvider(knowledgeProvider(username))
    bob.setProvider(barProvider(username))
    bob.setProvider(datasetProvider())
    bob.setProvider(messageHistoryProvider(thread))
    
    return bob
}