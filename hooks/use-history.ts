/* 
You start at:        stack = [root],              index = 0
Enter Fluid Mech:    stack = [root, fluid],       index = 1
Enter Statics pt1:   stack = [root, fluid, stat], index = 2
Hit back:            stack = [root, fluid, stat], index = 1  ← pointer moves, stack unchanged
Hit back again:      stack = [root, fluid, stat], index = 0
Enter Quantum:       stack = [root, quantum],     index = 1  ← forward history (fluid,stat) is gone
*/

import { useState } from "react";
import { CurrentPath } from "@/lib/types";

export function useHistory(initialPath:CurrentPath) {
    const [stack, setStack] = useState<CurrentPath[]>([initialPath])
    const [index, setIndex] = useState(0)
    function push(newPath:CurrentPath) {
        const newStack = stack.slice(0, index + 1)
        newStack.push(newPath)
        setStack(newStack)
        setIndex(newStack.length - 1)
    }
    function goBack() {
        if (canGoBack) setIndex(i => i - 1)
    }
    function goForward() {
        if (canGoForward) setIndex(i => i + 1)
    }
    const canGoBack= index > 0
    const canGoForward = index < stack.length - 1
    const current = stack[index]
    
    return { current, push, goBack, goForward, canGoBack, canGoForward}
}