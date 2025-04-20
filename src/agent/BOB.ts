import { AgentBuilder, systemProvider, AgentBuilderSettings } from "@olivertj/agent-builder"
import { BOBPrompts, barProvider, datasetProvider, knowledgeProvider } from "@/agent"
import fs from 'fs'
import path from 'path'

export async function buildBOB(username:string): Promise<AgentBuilder> {
    const config : AgentBuilderSettings = {
        debug: true,
    }
    const bob = new AgentBuilder(BOBPrompts.PROMPT.prefix, config)
    bob.setProvider(systemProvider(BOBPrompts.SYSTEM.prefix))
    bob.setProvider(knowledgeProvider(username))
    bob.setProvider(barProvider(username))
    bob.setProvider(datasetProvider())
    const system = await bob.system()
    const prompt = await bob.prompt()
    
    // Save system and prompt to debug file
    if (config.debug) {
        const debugContent = `${system}\n\n\n${prompt}`
        const debugPath = path.join(__dirname, '..', 'debug_prompt.txt')
        fs.writeFileSync(debugPath, debugContent, 'utf-8')
    }
    
    return bob
}