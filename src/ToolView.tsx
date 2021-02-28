import React from 'react'
import { ToolCard } from './ToolCard'
import './ToolView.css'

export type ToolViewProps = {

}

export const ToolView = (props : ToolViewProps) => {
    return (<div className='toolview'>
        <ToolCard title={'some feature'}/>
        <ToolCard title={'some feature'}/>
        <ToolCard title={'some feature'}/>
        <ToolCard title={'some feature'}/>
        <ToolCard title={'some feature'}/>
        <ToolCard title={'some feature'}/>
        <ToolCard title={'some feature'}/>
    </div>)
}