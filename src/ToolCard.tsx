import { createEmitAndSemanticDiagnosticsBuilderProgram } from "typescript"

import React from 'react';
import { Card } from 'antd'
import './ToolCard.css'

export type ToolCardProps = {
    title: string,
}

export const ToolCard = ( {title} : ToolCardProps) => {
    return (<div className = 'card'>
        <Card title={title} hoverable>
            Coming soon!
        </Card>

    </div>)
}