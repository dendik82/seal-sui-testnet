// Copyright (c), Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { ConnectButton, useCurrentAccount } from '@mysten/dapp-kit';
import { Box, Button, Card, Container, Flex, Grid } from '@radix-ui/themes';
import { CreateAllowlist } from './CreateAllowlist';
import { Allowlist } from './Allowlist';
import WalrusUpload from './EncryptAndUpload';
import { useState } from 'react';
import { CreateService } from './CreateSubscriptionService';
import FeedsToSubscribe from './SubscriptionView';
import { Service } from './SubscriptionService';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AllAllowlist } from './OwnedAllowlists';
import { AllServices } from './OwnedSubscriptionServices';
import Feeds from './AllowlistView';

function LandingPage() {
  return (
    <Grid columns="2" gap="4">
      <Card>
        <Flex direction="column" gap="2" align="center" style={{ height: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <h2>Daftar Izin (Allowlist)</h2>
            <p>
              Demonstrasi bagaimana seorang kreator dapat mengatur akses berdasarkan daftar izin.
              Kreator dapat membuat daftar yang berisi pengguna yang diizinkan, lalu mengaitkan file terenkripsi dengan daftar tersebut.
              Hanya pengguna yang tercantum dalam daftar izin yang dapat mendekripsi dan mengakses file.
            </p>
          </div>
          <Link to="/allowlist-example">
            <Button size="3">Coba Sekarang</Button>
          </Link>
        </Flex>
      </Card>
      <Card>
        <Flex direction="column" gap="2" align="center" style={{ height: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <h2>Akses Langganan</h2>
            <p>
              Demonstrasi bagaimana seorang kreator dapat menetapkan akses berbasis langganan.
              Kreator menentukan biaya dan durasi langganan, lalu mengaitkan file terenkripsi dengan layanan tersebut.
              Hanya pengguna yang memiliki NFT langganan aktif yang dapat mengakses dan mendekripsi file yang dibagikan.
            </p>
          </div>
          <Link to="/subscription-example">
            <Button size="3">Coba Sekarang</Button>
          </Link>
        </Flex>
      </Card>
    </Grid>
  );
}

function App() {
  const currentAccount = useCurrentAccount();
  const [recipientAllowlist, setRecipientAllowlist] = useState<string>('');
  const [capId, setCapId] = useState<string>('');
  return (
    <Container>
      <Flex position="sticky" px="4" py="2" justify="between">
        <h1 className="text-4xl font-bold m-4 mb-8">Seal Sui Testnet</h1>
        {/* <p>TODO: add seal logo</p> */}
        <Box>
          <ConnectButton />
        </Box>
      </Flex>
<Card style={{ marginBottom: '2rem' }}>
  <p>
    1. Hanya berlaku untuk jaringan Testnet. Pastikan dompet Anda terhubung ke jaringan Sui Testnet dan memiliki saldo (Anda bisa meminta token dari <a href="https://faucet.sui.io/">faucet.sui.io</a>).
  </p>
  <p>
    3. File hanya disimpan di jaringan Walrus Testnet selama 1 epoch secara default. Setelah itu, file tidak dapat diakses lagi meskipun Anda memiliki hak akses.
  </p>
  <p>
    4. Saat ini hanya file gambar yang didukung. Antarmuka ini dirancang sederhana dan hanya untuk tujuan demonstrasi!
  </p>
</Card>
      {currentAccount ? (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/allowlist-example/*"
              element={
                <Routes>
                  <Route path="/" element={<CreateAllowlist />} />
                  <Route
                    path="/admin/allowlist/:id"
                    element={
                      <div>
                        <Allowlist
                          setRecipientAllowlist={setRecipientAllowlist}
                          setCapId={setCapId}
                        />
                        <WalrusUpload
                          policyObject={recipientAllowlist}
                          cap_id={capId}
                          moduleName="allowlist"
                        />
                      </div>
                    }
                  />
                  <Route path="/admin/allowlists" element={<AllAllowlist />} />
                  <Route
                    path="/view/allowlist/:id"
                    element={<Feeds suiAddress={currentAccount.address} />}
                  />
                </Routes>
              }
            />
            <Route
              path="/subscription-example/*"
              element={
                <Routes>
                  <Route path="/" element={<CreateService />} />
                  <Route
                    path="/admin/service/:id"
                    element={
                      <div>
                        <Service
                          setRecipientAllowlist={setRecipientAllowlist}
                          setCapId={setCapId}
                        />
                        <WalrusUpload
                          policyObject={recipientAllowlist}
                          cap_id={capId}
                          moduleName="subscription"
                        />
                      </div>
                    }
                  />
                  <Route path="/admin/services" element={<AllServices />} />
                  <Route
                    path="/view/service/:id"
                    element={<FeedsToSubscribe suiAddress={currentAccount.address} />}
                  />
                </Routes>
              }
            />
          </Routes>
        </BrowserRouter>
      ) : (
        <p>Please connect your wallet to continue</p>
      )}
    </Container>
  );
}

export default App;
