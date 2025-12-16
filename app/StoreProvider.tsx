"use client"

import React, { useState } from "react"
import { Provider } from "react-redux"
import { makeStore } from "../lib/store"

type Props = {
	children: React.ReactNode
}

export default function StoreProvider({ children }: Props) {
	const [store] = useState(() => makeStore())

	return <Provider store={store}>{children}</Provider>
}

