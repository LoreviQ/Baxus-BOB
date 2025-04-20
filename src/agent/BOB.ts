import { AgentBuilder, systemProvider, AgentBuilderSettings } from "@olivertj/agent-builder"
import { BOBPrompts } from "@/agent/prompts/BOB"

export function buildBOB(): AgentBuilder{
    const config : AgentBuilderSettings = {
        debug: false,
    }
    const bob = new AgentBuilder(BOBPrompts.PROMPT.prefix, config)
    bob.setProvider(systemProvider(BOBPrompts.SYSTEM.prefix))
    return bob
}