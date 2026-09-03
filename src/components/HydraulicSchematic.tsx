type Props = {
  className?: string;
  tone?: "ink" | "paper";
};

/**
 * Signature graphic: a stylized hydraulic distribution-network schematic
 * (reservoir, booster, trunk main, DMA branches) in the drafting style of
 * an EPANET model — the actual diagram type JAS's engineers produce.
 */
export default function HydraulicSchematic({ className, tone = "ink" }: Props) {
  const stroke = tone === "ink" ? "#16283a" : "#eef2f2";
  const dim = tone === "ink" ? "#5f7080" : "#9fb0b8";
  const label = tone === "ink" ? "#3a4a58" : "#c7d2d6";

  return (
    <svg
      viewBox="0 0 560 460"
      fill="none"
      className={className}
      role="img"
      aria-label="Schematic diagram of a water distribution network: reservoir, booster pump, trunk main, and monitored distribution zones"
    >
      <style>{`text { font-family: var(--font-plex-mono), monospace; }`}</style>
      {/* trunk main */}
      <path
        d="M76 96 H240 V196"
        stroke={stroke}
        strokeWidth="2"
        className="schematic-path"
        style={{ animationDelay: "0.1s" }}
      />
      <path
        d="M240 196 V300"
        stroke={stroke}
        strokeWidth="2"
        className="schematic-path"
        style={{ animationDelay: "0.5s" }}
      />
      {/* branch to DMA-01 */}
      <path
        d="M240 196 H392 V150"
        stroke={dim}
        strokeWidth="1.5"
        className="schematic-path"
        style={{ animationDelay: "0.7s" }}
      />
      {/* branch to DMA-02 */}
      <path
        d="M240 196 H392"
        stroke={dim}
        strokeWidth="1.5"
        className="schematic-path"
        style={{ animationDelay: "0.85s" }}
      />
      {/* branch to DMA-03 */}
      <path
        d="M240 300 H108 V370"
        stroke={dim}
        strokeWidth="1.5"
        className="schematic-path"
        style={{ animationDelay: "1s" }}
      />
      {/* branch to DMA-04 (monitored) */}
      <path
        d="M240 300 H392 V352"
        stroke={dim}
        strokeWidth="1.5"
        className="schematic-path"
        style={{ animationDelay: "1.15s" }}
      />

      {/* reservoir symbol */}
      <rect
        x="36"
        y="66"
        width="40"
        height="30"
        rx="1"
        stroke={stroke}
        strokeWidth="2"
        className="schematic-node"
        style={{ animationDelay: "0s" }}
      />
      <path
        d="M36 76 H76 M36 86 H76"
        stroke={stroke}
        strokeWidth="1"
        opacity="0.5"
        className="schematic-node"
        style={{ animationDelay: "0s" }}
      />
      <text
        x="16"
        y="118"
        fontSize="10"
        letterSpacing="0.06em"
        fill={label}
        className="schematic-node"
        style={{ animationDelay: "0.3s", fontFamily: "var(--font-plex-mono), monospace" }}
      >
        RESERVOIR
      </text>

      {/* booster pump symbol */}
      <circle
        cx="240"
        cy="196"
        r="14"
        stroke={stroke}
        strokeWidth="2"
        className="schematic-node"
        style={{ animationDelay: "0.45s" }}
      />
      <path
        d="M233 202 L247 190 M233 190 L247 202"
        stroke={stroke}
        strokeWidth="1.5"
        className="schematic-node"
        style={{ animationDelay: "0.45s" }}
      />
      <text
        x="260"
        y="200"
        fontSize="10"
        letterSpacing="0.06em"
        fill={label}
        className="schematic-node"
        style={{ animationDelay: "0.6s", fontFamily: "var(--font-plex-mono), monospace" }}
      >
        BOOSTER PUMP
      </text>

      {/* junction at 240,300 */}
      <circle
        cx="240"
        cy="300"
        r="4"
        fill={stroke}
        className="schematic-node"
        style={{ animationDelay: "0.95s" }}
      />

      {/* DMA-01 node */}
      <circle
        cx="392"
        cy="150"
        r="6"
        stroke={stroke}
        strokeWidth="2"
        fill="none"
        className="schematic-node"
        style={{ animationDelay: "0.95s" }}
      />
      <text
        x="410"
        y="154"
        fontSize="10"
        letterSpacing="0.06em"
        fill={label}
        className="schematic-node"
        style={{ animationDelay: "1s" }}
      >
        DMA-01
      </text>

      {/* DMA-02 node */}
      <circle
        cx="392"
        cy="196"
        r="6"
        stroke={stroke}
        strokeWidth="2"
        fill="none"
        className="schematic-node"
        style={{ animationDelay: "1.05s" }}
      />
      <text
        x="410"
        y="200"
        fontSize="10"
        letterSpacing="0.06em"
        fill={label}
        className="schematic-node"
        style={{ animationDelay: "1.1s" }}
      >
        DMA-02
      </text>

      {/* DMA-03 node */}
      <circle
        cx="108"
        cy="370"
        r="6"
        stroke={stroke}
        strokeWidth="2"
        fill="none"
        className="schematic-node"
        style={{ animationDelay: "1.2s" }}
      />
      <text
        x="70"
        y="394"
        fontSize="10"
        letterSpacing="0.06em"
        fill={label}
        className="schematic-node"
        style={{ animationDelay: "1.25s" }}
      >
        DMA-03
      </text>

      {/* DMA-04 — monitored node, signal accent */}
      <circle
        cx="392"
        cy="352"
        r="10"
        stroke="#d6791f"
        strokeWidth="1"
        opacity="0.35"
        className="schematic-node"
        style={{ animationDelay: "1.3s" }}
      />
      <circle
        cx="392"
        cy="352"
        r="6"
        fill="#d6791f"
        className="schematic-node"
        style={{ animationDelay: "1.35s" }}
      />
      <text
        x="410"
        y="356"
        fontSize="10"
        letterSpacing="0.06em"
        fill="#d6791f"
        className="schematic-node"
        style={{ animationDelay: "1.4s" }}
      >
        DMA-04 — LIVE
      </text>
    </svg>
  );
}
